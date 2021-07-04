import axios from "axios"
import { getSession } from "next-auth/client"
import API_FUNCTION from "../../src/api"

const AdminPage=(props:any)=>{
    return (<div>
      {JSON.stringify(props)}
    </div>)
}
export default AdminPage
export async function getServerSideProps({req,res}:any) {
  let roles:any=null
  let session:any =await getSession({req})
    if(session)
    {
      try{
        console.log(session)
        roles = await API_FUNCTION(session.user.jwt).get('/admin/roles')
        roles =roles.data.rows
      }
      catch(e:any){
        console.log({e})
      }
    }
    return {
      props: {roles}, // will be passed to the page component as props
    }
  }