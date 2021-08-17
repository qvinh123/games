import imagePlatforms from "../assets/imagePlatforms"

export const renderPlatforms = (game) => {
    if (game.parent_platforms?.length <= 5) {
        return game.parent_platforms?.slice(0, 5)?.map(({ platform }) => {
            return <span key={platform.id}>{imagePlatforms(platform.slug)}</span>
        })
    } else {
        return game.parent_platforms?.slice(0, 5)?.map(({ platform }) => {
            return <span key={platform.id}>{imagePlatforms(platform.slug)}</span>
        })
    }
}