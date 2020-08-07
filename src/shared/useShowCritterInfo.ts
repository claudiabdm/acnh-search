import { ref, Ref } from '@vue/composition-api';
import { Critter } from './models/critter';

const showCritterInfo = () => {
  const isModalVisible: Ref<boolean> = ref(false);
  const currentCritter: Ref<Critter> = ref({} as Critter);
  function toggleCritterInfo(value: Critter): void {
    if (!isModalVisible.value) {
      isModalVisible.value = true;
      currentCritter.value = value;
    } else {
      isModalVisible.value = false;
      currentCritter.value = {} as Critter;
    }
  }
  return {
    isModalVisible,
    currentCritter,
    toggleCritterInfo,
  };
};

export default showCritterInfo;
