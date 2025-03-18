import {getPosts} from "../posts/index.js";

export const getPostsByTitle = async (url, title) => {

    const allPosts = await getPosts(url);

    let regexTitle = new RegExp(title);

    const coincidencesPost = allPosts.filter(post => regexTitle.test(post.title));

    return coincidencesPost;
}