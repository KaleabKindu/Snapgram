import { Models } from "appwrite"
import Link from "next/link"
import { Routes } from "../../../Routes"
import Image from "next/image"
import moment from 'moment'
import { BiEdit } from "react-icons/bi";
import { useAuthContext } from "@/context/authContext"
import { Button } from "../ui/button"
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useEffect, useState } from "react"
import { FaHeart } from "react-icons/fa";
import { useDeleteSavedPostMutation, useLikePostMutation, useSavePostMutation } from "@/lib/react-query/mutations"

type Props = {
    post:Models.Document
}

const PostCard = ({ post }: Props) => {
    const { session } = useAuthContext()
    const [ likes, setLikes ] = useState<string[]>(post.likes.map((user:Models.Document) => user.$id))
    const [ isSaved, setIsSaved ] = useState(false)
    const { mutateAsync:likePost } = useLikePostMutation({
        postId:post.$id,
    })
    const { mutateAsync:savePost } = useSavePostMutation({
        postId:post.$id,
        userId:session?.$id
    })

    const { mutateAsync:deleteSavedPost } = useDeleteSavedPostMutation({
        postId:post.$id,
    })
    const handleLike = () => {
        const newLikes = likes.includes(session.$id) ? likes.filter((id) => id !== session.$id):[...likes, session.$id]
        setLikes(newLikes)
        likePost(newLikes)
    }

    const handleSave = async () => {
        const savedRecord = post.saves?.find((record:Models.Document) => record.user.id === session.id)
        if(isSaved){
            setIsSaved(false)
            deleteSavedPost(savedRecord.$id)
        }else{
            setIsSaved(true)
            savePost()
        }
    }
    useEffect(() => {
        if(session){
            const saved = post.saves?.find((save:Models.Document) => save.user.id === session.id)
            saved && setIsSaved(true)
        }
    },[session])
  return (
    <div className="post-card">
        <Link href={`${Routes.Profile}/${post.creator?.id}`} className='flex items-center gap-3'>
          <div className='relative w-14 h-14 rounded-full'>
            <Image src={post.creator?.imageUrl || '/assets/icons/profile-placeholder.svg' } className='rounded-full' fill alt='Profile pic'/>
          </div>
          <div className='flex flex-col'>
            <div className='body-bold'>{post.creator?.name}</div>
            <div className='small-regular text-light-3'>
                <p className="subtle-semibold lg:small-regular">{moment(post.$createdAt).fromNow()} - {post.location}</p> 
            </div>
          </div>
          {session?.id === post.creator?.id && 
          <Link href={`${Routes.UpdatePost}/${post.$id}`} className="ml-auto">
            <BiEdit size={30} className="text-primary-500" />
          </Link>}
        </Link>
        <Link href={`${Routes.Posts}/${post.$id}`}>
            <div className="small-medium lg:base-medium py-5">
                <p>{post.caption}</p>
                <ul className="flex gap-1">
                    {
                        post.tags.map((tag:string) => (
                            <li key={tag} className="text-light-3">#{tag}</li>
                        ))
                    }
                </ul>
            </div>
                <Image className="post-card_img" src={post.imageUrl} width={300} height={500} alt={post.caption} />
        </Link>
        <div className="flex justify-between">
            <div className="flex items-center">
                <Button type='button' variant='ghost' className="rounded-full" onClick={handleLike}>
                    {likes.includes(session?.$id) ? <FaHeart className="text-red" size={25} />:<FaRegHeart size={25}/>}
                </Button>
                <p className="small-medium lg:base-medium">{likes.length}</p>
            </div>
            <Button type='button' variant='ghost' className="rounded-full" onClick={handleSave}>
                {isSaved ? <FaBookmark size={25} className="text-primary-500"/>:<FaRegBookmark size={25}/>}
            </Button>
        </div>
    </div>
  )
}

export default PostCard