'use client'
import CreatePostForm from "@/components/forms/CreatePostForm"
import { useGetPostByIdQuery } from "@/lib/react-query/queries"

type Props = {
  params:{id:string}
}

const EditPost = ({params}: Props) => {
  const { data:post } = useGetPostByIdQuery({ postId:params.id})
  return (
    <div className="common-container">
        <h3 className="h3-bold md:h2-bold text-left w-full">Edit Post</h3>
        {post && <CreatePostForm post={post} />}
    </div>
  )
}

export default EditPost