import React, { useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
import {useAddJobMutation} from "../../../../redux/services/jobs/JobServices"


const Publish = () => {


  
  const job = useSelector((state) => state.job.job);
  const [modalOpen, setModalOpen] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);

  const {addJobData, addJobDataInfo,refetch}=useAddJobMutation()
 

   
  
    
//  useEffect(() => {
//   if (addJobDataInfo.isSuccess) {
//     showToast('success', 'job form Sucessfully');
//     // const savedAssesmentRecord = addJobDataInfo.data.data.find((item) => item.name === assesmentName);
//     addJobDataInfo.reset();
//   }
//   if (addJobDataInfo.isError) {
//     showToast('error', addJobDataInfo.error.data.msg);
//     addJobDataInfo.reset();
//   }},[addJobDataInfo,refetch,setModalOpen])

  return <div>Publish</div>;
}
export default Publish;
