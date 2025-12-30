import { DEBUG } from '../config';

export { default as Main } from '../components/main/Main';
export { default as LockScreen } from '../components/main/LockScreen';

if (DEBUG) {
   
  console.log('>>> FINISH LOAD MAIN BUNDLE');
}
