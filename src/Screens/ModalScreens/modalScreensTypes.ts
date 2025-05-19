export interface jobDurationProps {
  id: Number;
  label: String;
  value: Number;
}


export interface JobDurationModalTypes { 
  isModalVisible : Boolean,
  onBackdropPress :  () => void;
}