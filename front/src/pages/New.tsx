import { Canvas } from "../component"
import { useHygallContext } from "../context/HygallContext"

export function New(){
    const {addPost, uploadImage, post, cleanPost, editPost} = useHygallContext()

    return( 
        <Canvas 
            mode="new"
            post = {post}
            addPost = {addPost}
            uploadImage ={uploadImage}
            cleanPost = {cleanPost}
            editPost = {editPost}
        />
    )
}