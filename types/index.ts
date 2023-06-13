export type userType={
    id: string,
    username: string,
    name: string,
    image?:string|undefined
}
export type tweetType={
    id: string,
    user: userType,
    createdAt: string,
    content: string,
    image?:string|undefined,
    numberOfComments?: number,
    numberOfRetweets?: number,
    numberOfLikes?: number,
    impressions?: number
}