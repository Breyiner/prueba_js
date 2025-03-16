import * as posts from "../posts/";

export const getPostsByTitle = async (url, title) => {

    const allPosts = await posts.getPosts(url);

    let regexTitle = new RegExp(title);

    const coincidencesPost = allPosts.filter(post => regexTitle.test(post.title));

    return coincidencesPost;
}