import { sendRequest } from '../databaseAPI'


export async function DeletePost(postid: string) {
    
    try{
        console.log('Deleting post')
        const response = await sendRequest("post", "DELETE", {postid});
    if (!response.ok) {
  const details = await response.text();
  throw new Error(
    `Deletion failed: ${response.status} ${response.statusText}. ${details}`
  );
}
    return response;
    } catch (error) {
    console.error('Deletion failed', error)
    throw error
    }
}
