import CreatePostForm from "@/components/forms/CreatePostForm"

type Props = {}

const CreatePost = (props: Props) => {
  return (
    <div className="common-container">
        <h3 className="h3-bold md:h2-bold text-left w-full">Create Post</h3>
        <CreatePostForm/>
    </div>
  )
}

export default CreatePost