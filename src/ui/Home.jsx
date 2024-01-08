import CreateUser from "./../features/user/CreateUser";
import { useSelector } from 'react-redux'
import Button from "./Button";
function Home() {

  const username = useSelector((store)=>store.user.username);
  return (
    <div className="my-10  text-center sm:my-16">
      <h1 className=" mb-8
       text-stone-600 font-bold text-xl md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">Straight out of the oven, straight to you.</span>
      </h1>
      {
        username==="" ?  <CreateUser />  : (
          <div>
          <h1 className="mb-8 mt-8 text-xl text-stone-600 font-semibold">Hi, {username} 👋</h1>
        <Button type="primary" to="/menu"> Start Ordering</Button>
        </div>)

      }
     
    </div>
  );
}

export default Home;
