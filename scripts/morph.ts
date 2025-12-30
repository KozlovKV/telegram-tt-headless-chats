/* eslint-disable no-console */
import * as fs from 'fs';
import * as path from 'path';
import type {
  EnumDeclaration,
  InterfaceDeclaration,
  SourceFile,
  TypeAliasDeclaration,
  VariableDeclaration,
} from 'ts-morph';
import { Node, Project } from 'ts-morph';

// Configuration
const CONFIG = {
  rootDir: 'src/',
  outputDir: 'dist-types/',
  entryPoint: 'src/external-types.ts',
  // Types to always include
  coreTypes: [
    'ExteranlApiUser',
    'ExteranlApiUserFullInfo',
    'ExteranlApiChat',
    'ExteranlApiMessage',
    'ApiDimensions',
  ],
  // External modules to stub
  externalModules: {
    '@teact': 'any',
    gramjs: 'any',
  },
};

class TypeExtractor {
  private project: Project;
  private sourceFiles: Map<string, SourceFile>;
  private typeGraph: Map<string, Set<string>>;
  private extractedTypes: Map<string, ExtractedType>;

  getTypeGraph() {
    return this.typeGraph;
  }

  getExtractedTypes() {
    return this.extractedTypes;
  }

  constructor() {
    // Initialize ts-morph project
    this.project = new Project({
      tsConfigFilePath: 'tsconfig.json',
      skipAddingFilesFromTsConfig: true,
    });

    this.sourceFiles = new Map();
    this.typeGraph = new Map();
    this.extractedTypes = new Map();
  }

  initialize() {
    // Load all type files
    const typeFiles = this.discoverTypeFiles(path.resolve(CONFIG.rootDir));
    for (const filePath of typeFiles) {
      const sourceFile = this.project.addSourceFileAtPath(filePath);
      this.sourceFiles.set(filePath, sourceFile);
    }

    console.log(`Loaded ${this.sourceFiles.size} type files`);
  }

  private discoverTypeFiles(base: string): string[] {
    const files: string[] = [];
    const entries = fs.readdirSync(base, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.ts')) {
        files.push(path.join(base, entry.name));
      } else if (entry.isDirectory()) {
        files.push(...this.discoverTypeFiles(path.join(base, entry.name)));
      }
    }

    return files;
  }

  extractTypes() {
    for (const [filePath, sourceFile] of this.sourceFiles) {
      // Extract interfaces
      const interfaces = sourceFile.getInterfaces();
      for (const iface of interfaces) {
        // if (this.shouldExtract(iface)) {
        // console.log('[IFACE] ' + iface.getText());
        this.extractInterface(iface, filePath);
        // }
      }

      // Extract type aliases
      const typeAliases = sourceFile.getTypeAliases();
      for (const alias of typeAliases) {
        // if (this.shouldExtract(alias)) {
        // console.log('[TYPE] ' + alias.getText());
        this.extractTypeAlias(alias, filePath);
        // }
      }

      // Extract enums
      const enums = sourceFile.getEnums();
      for (const enumDecl of enums) {
        // if (this.shouldExtract(enumDecl)) {
        // console.log('[ENUM] ' + enumDecl.getText());
        this.extractTypeEnum(enumDecl, filePath);
        // }
      }

      // Extract const assertions that act as enums
      const constVars = sourceFile.getVariableDeclarations();
      for (const varDecl of constVars) {
        // if (this.isConstEnum(varDecl)) {
        // console.log('[CONST] ' + varDecl.getText());
        this.extractConstEnum(varDecl, filePath);
        // }
      }
    }
  }

  private extractInterface(iface: InterfaceDeclaration, filePath: string) {
    const name = iface.getName();
    const dependencies = this.findDependencies(iface);

    const extracted: ExtractedType = {
      name,
      kind: 'interface',
      text: iface.getText(),
      dependencies,
      filePath,
      isExported: iface.isExported(),
      generics: iface.getTypeParameters().map((p) => p.getText()),
      jsDoc: iface
        .getJsDocs()
        .map((jsDoc) => jsDoc.getText())
        .join('\n'),
    };

    this.extractedTypes.set(name, extracted);
    this.typeGraph.set(name, dependencies);
  }

  private extractTypeAlias(alias: TypeAliasDeclaration, filePath: string) {
    const name = alias.getName();
    const dependencies = this.findDependencies(alias);
    if (name === 'ApiChatType' || name === 'ApiStarsAmount') {
      console.log(name, dependencies, alias.getText());
    }

    const extracted: ExtractedType = {
      name,
      kind: 'type',
      text: alias.getText(),
      dependencies,
      filePath,
      isExported: alias.isExported(),
      generics: alias.getTypeParameters().map((p) => p.getText()),
      jsDoc: alias
        .getJsDocs()
        .map((jsDoc) => jsDoc.getText())
        .join('\n'),
    };

    this.extractedTypes.set(name, extracted);
    this.typeGraph.set(name, dependencies);
  }

  private extractTypeEnum(enumDecl: EnumDeclaration, filePath: string) {
    const name = enumDecl.getName();
    const dependencies = this.findDependencies(enumDecl);

    const extracted: ExtractedType = {
      name,
      kind: 'enum',
      text: enumDecl.getText(),
      dependencies,
      filePath,
      isExported: enumDecl.isExported(),
      generics: [],
      jsDoc: enumDecl
        .getJsDocs()
        .map((jsDoc) => jsDoc.getText())
        .join('\n'),
    };

    this.extractedTypes.set(name, extracted);
    this.typeGraph.set(name, dependencies);
  }

  private extractConstEnum(varDecl: VariableDeclaration, filePath: string) {
    const name = varDecl.getName();
    const dependencies = this.findDependencies(varDecl);

    const extracted: ExtractedType = {
      name,
      kind: 'const',
      text: varDecl.getText(),
      dependencies,
      filePath,
      isExported: varDecl.isExported(),
      generics: [],
      jsDoc: '',
    };

    this.extractedTypes.set(name, extracted);
    this.typeGraph.set(name, dependencies);
  }

  private findDependencies(node: Node): Set<string> {
    const deps = new Set<string>();

    // Find all type references in the node
    node.forEachDescendant((child) => {
      if (Node.isTypeReference(child)) {
        const typeName = child.getTypeName();
        if (Node.isIdentifier(typeName)) {
          const name = typeName.getText();
          // Filter out built-in types
          if (!this.isBuiltInType(name)) {
            deps.add(name);
          }
        }
      }
    });

    return deps;
  }

  private isBuiltInType(name: string): boolean {
    const builtIns = [
      'string',
      'number',
      'boolean',
      'undefined',
      'null',
      'void',
      'never',
      'any',
      'unknown',
      'Array',
      'Object',
      'Promise',
      'Map',
      'Set',
      'Date',
      'RegExp',
      'Error',
      'Partial',
      'Required',
      'Readonly',
      'Pick',
      'Omit',
      'Record',
      'Exclude',
      'Extract',
    ];
    return builtIns.includes(name);
  }
}

interface ExtractedType {
  name: string;
  kind: 'interface' | 'type' | 'enum' | 'const';
  text: string;
  dependencies: Set<string>;
  filePath: string;
  isExported: boolean;
  generics?: string[];
  jsDoc?: string;
}

class DependencyResolver {
  private visited = new Set<string>();
  private resolved = new Set<string>();
  private typeGraph: Map<string, Set<string>>;

  constructor(typeGraph: Map<string, Set<string>>) {
    this.typeGraph = typeGraph;
  }

  // Topological sort to handle dependencies
  resolveDependencies(startTypes: string[]): string[] {
    const result: string[] = [];

    for (const type of startTypes) {
      this.visit(type, result);
    }

    return result;
  }

  private visit(type: string, result: string[]) {
    if (this.resolved.has(type)) {
      return;
    }

    if (this.visited.has(type)) {
      console.warn(`Circular dependency detected for type: ${type}`);
      return;
    }

    this.visited.add(type);

    const dependencies = this.typeGraph.get(type);
    if (dependencies) {
      for (const dep of dependencies) {
        this.visit(dep, result);
      }
    }

    this.visited.delete(type);
    this.resolved.add(type);
    result.push(type);
  }

  // Find all types transitively required by the core types
  findRequiredTypes(coreTypes: string[]): Set<string> {
    const required = new Set<string>();
    const queue = [...coreTypes];

    while (queue.length > 0) {
      const type = queue.shift()!;

      if (required.has(type)) {
        continue;
      }

      required.add(type);

      const deps = this.typeGraph.get(type);
      if (deps) {
        for (const dep of deps) {
          if (!required.has(dep)) {
            queue.push(dep);
          }
        }
      }
    }

    return required;
  }
}

class ImportResolver {
  private externalStubs = new Map<string, string>();

  constructor() {
    // Initialize external module stubs
    for (const [module, stub] of Object.entries(CONFIG.externalModules)) {
      this.externalStubs.set(module, stub);
    }
  }

  rewriteImports(sourceText: string): string {
    let result = sourceText;

    // Remove runtime imports
    result = this.removeRuntimeImports(result);

    // Rewrite relative imports for dist-types structure
    result = this.rewriteRelativeImports(result);

    // Stub external dependencies
    result = this.stubExternalImports(result);

    return result;
  }

  private removeRuntimeImports(text: string): string {
    // Remove imports that are not type-only
    const importRegex = /^import\s+(?!type\s+).*$/gm;
    return text.replace(importRegex, (match) => {
      // Check if this is a runtime import we should remove
      if (this.isRuntimeImport(match)) {
        return '// Runtime import removed: ' + match;
      }
      return match;
    });
  }

  private rewriteRelativeImports(text: string): string {
    // Convert relative imports to work in dist-types
    const typeImportRegex =
      /import\s+type\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]/g;

    return text.replace(typeImportRegex, (match, imports, module) => {
      // If it's a relative import to another type file
      if (module.startsWith('./')) {
        // Keep the same relative structure
        return `import type {${imports}} from '${module}'`;
      }

      // If it's an import from parent directories
      if (module.startsWith('../')) {
        // Check if we need to stub this
        const stubType = this.getStubForModule(module);
        if (stubType) {
          return `// Stubbed: ${match}\ntype ${imports.trim()} = ${stubType};`;
        }
      }

      return match;
    });
  }

  private stubExternalImports(text: string): string {
    for (const [module, stub] of this.externalStubs) {
      const regex = new RegExp(
        `import\\s+type\\s+\\{([^}]+)\\}\\s+from\\s+['"]${module}['"]`,
        'g',
      );
      text = text.replace(regex, (match, types) => {
        const typeList = types.split(',').map((t: string) => t.trim());
        return typeList
          .map((type: any) => `type ${type} = ${stub};`)
          .join('\n');
      });
    }
    return text;
  }

  private isRuntimeImport(importStatement: string): boolean {
    // List of patterns that indicate runtime imports
    const runtimePatterns = [
      /import\s+\w+\s+from/, // Default imports
      /import\s+\{[^}]+\}\s+from\s+['"]\.\.\/gramjs/, // gramjs runtime
      /import\s+\{[^}]+\}\s+from\s+['"]\.\.\/\.\.\/config/, // config runtime
    ];

    return runtimePatterns.some((pattern) => pattern.test(importStatement));
  }

  private getStubForModule(module: string): string | undefined {
    // Map module patterns to stub types
    if (module.includes('teact')) return 'any';
    if (module.includes('gramjs')) return 'any';
    if (module.includes('config')) return '{ [key: string]: any }';
    return undefined;
  }
}

class OutputGenerator {
  private extractedTypes: Map<string, ExtractedType>;
  private outputDir: string;

  constructor(extractedTypes: Map<string, ExtractedType>, outputDir: string) {
    this.extractedTypes = extractedTypes;
    this.outputDir = outputDir;
  }

  generate(typesToInclude: Set<string>) {
    // Create output directory
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // Group types by original file
    const typesByFile = this.groupTypesByFile(typesToInclude);

    // Generate output files
    for (const [fileName, types] of typesByFile) {
      this.generateFile(fileName, types);
    }

    // Generate main index file
    this.generateIndex(typesByFile);

    console.log(
      `Generated ${typesByFile.size} type files in ${this.outputDir}`,
    );
  }

  private groupTypesByFile(types: Set<string>): Map<string, ExtractedType[]> {
    const byFile = new Map<string, ExtractedType[]>();

    for (const typeName of types) {
      const type = this.extractedTypes.get(typeName);
      if (!type) continue;

      const fileName = path.basename(type.filePath, '.ts');

      if (!byFile.has(fileName)) {
        byFile.set(fileName, []);
      }

      byFile.get(fileName)!.push(type);
    }

    return byFile;
  }

  private generateFile(fileName: string, types: ExtractedType[]) {
    const filePath = path.join(this.outputDir, `${fileName}.d.ts`);

    let content = '/* tslint:disable */\n';
    content += '/* eslint-disable */\n';
    // eslint-disable-next-line @stylistic/max-len
    content += `/**\n * Auto-generated type definitions from telegram-web\n * Generated: ${new Date().toISOString()}\n */\n\n`;

    // Add necessary imports
    const imports = this.collectImports(types);
    content += this.generateImports(imports);
    content += '\n';

    // Sort types by dependency order
    const sortedTypes = this.sortTypesByDependency(types);

    // Add type definitions
    for (const type of sortedTypes) {
      if (type.jsDoc) {
        content += type.jsDoc + '\n';
      }

      content += type.text + '\n\n';
    }

    fs.writeFileSync(filePath, content);
  }

  private generateIndex(typesByFile: Map<string, ExtractedType[]>) {
    const indexPath = path.join(this.outputDir, 'index.d.ts');

    let content = '/**\n * Main entry point for telegram-web types\n */\n\n';

    // Export all types from each file
    for (const fileName of typesByFile.keys()) {
      content += `export * from './${fileName}';\n`;
    }

    fs.writeFileSync(indexPath, content);
  }

  private collectImports(types: ExtractedType[]): Map<string, Set<string>> {
    const imports = new Map<string, Set<string>>();

    for (const type of types) {
      for (const dep of type.dependencies) {
        // Check if this dependency is in the same file
        const depType = this.extractedTypes.get(dep);
        if (depType && depType.filePath !== type.filePath) {
          const depFile = path.basename(depType.filePath, '.ts');

          if (!imports.has(depFile)) {
            imports.set(depFile, new Set());
          }

          imports.get(depFile)!.add(dep);
        }
      }
    }

    return imports;
  }

  private generateImports(imports: Map<string, Set<string>>): string {
    let result = '';

    for (const [file, types] of imports) {
      const typeList = Array.from(types).sort().join(', ');
      result += `import type { ${typeList} } from './${file}';\n`;
    }

    return result;
  }

  private sortTypesByDependency(types: ExtractedType[]): ExtractedType[] {
    // Create a mini dependency graph for these types
    const graph = new Map<string, Set<string>>();

    for (const type of types) {
      const localDeps = new Set<string>();
      for (const dep of type.dependencies) {
        if (types.some((t) => t.name === dep)) {
          localDeps.add(dep);
        }
      }
      graph.set(type.name, localDeps);
    }

    // Topological sort
    const resolver = new DependencyResolver(graph);
    const sortedNames = resolver.resolveDependencies(types.map((t) => t.name));

    // Return types in sorted order
    return sortedNames
      .map((name) => types.find((t) => t.name === name))
      .filter((t) => t !== undefined);
  }
}

function main() {
  console.log('Starting type extraction from telegram-web...');

  try {
    // Initialize extractor
    const extractor = new TypeExtractor();
    extractor.initialize();

    // Extract all types
    console.log('Extracting types...');
    extractor.extractTypes();

    // Resolve dependencies
    console.log('Resolving dependencies...');
    const resolver = new DependencyResolver(extractor.getTypeGraph());
    const requiredTypes = resolver.findRequiredTypes(CONFIG.coreTypes);

    console.log(`Found ${requiredTypes.size} required types:`, requiredTypes);

    // Rewrite imports
    console.log('Rewriting imports...');
    const importResolver = new ImportResolver();
    for (const type of extractor.getExtractedTypes().values()) {
      type.text = importResolver.rewriteImports(type.text);
    }

    // Generate output
    console.log('Generating output files...');
    const generator = new OutputGenerator(
      extractor.getExtractedTypes(),
      CONFIG.outputDir,
    );
    generator.generate(requiredTypes);

    console.log('✅ Type extraction completed successfully!');
    console.log(`Output location: ${CONFIG.outputDir}/`);
  } catch (error) {
    console.error('❌ Type extraction failed:', error);
    process.exit(1);
  }
}

main();

export { TypeExtractor, DependencyResolver, ImportResolver, OutputGenerator };
