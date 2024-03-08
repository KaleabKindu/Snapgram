import PostFeed from "@/components/posts/PostFeed"

type Props = {}

const Home = (props: Props) => {
  return (
    <div className='home-container'>
      <div className="home-posts">
          <h3 className="h3-bold md:h2-bold text-left w-full">Feed</h3>
      </div>
      <PostFeed/>
    </div>
  )
}

export default Home