export type userType={
    id: string,
    username: string,
    name: string,
    image?:string
}
export type tweetType={
    id: string,
    user: userType,
    createdAt: string,
    content: string,
    image?:string,
    numberOfComments?: number,
    numberOfRetweets?: number,
    numberOfLikes?: number,
    impressions?: number
}