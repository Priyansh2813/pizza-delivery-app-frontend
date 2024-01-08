import { useSelector } from 'react-redux'

function Username() {

  const username = useSelector((state)=>state.user.username)

  return (
    <div className="text-xs font-semibold hidden md:block">
      {username}
    </div>
  )
}

export default Username;

