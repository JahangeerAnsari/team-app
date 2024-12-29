interface WorkSpaceIdProps{
    params: {
        workspaceId:string
    }
}
const WorkSpaceIdPage = ({params}: WorkSpaceIdProps) => {
    return <div>
      ID: {params.workspaceId}
  </div>;
};
 
export default WorkSpaceIdPage;