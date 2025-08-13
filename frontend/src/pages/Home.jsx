import Feed from "../component/Feed"
import LeftHome from "../component/LeftHome"
import RightHome from "../component/RightHome"

const Home = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <LeftHome/>
      <Feed/>
      <RightHome/>
    </div>
  )
}

export default Home
