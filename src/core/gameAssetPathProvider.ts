export class GameAssetPathProvider{
    private baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    public GetSpritePath(assetFileName: string){
        return this.baseUrl+ "/assets/sprites/" + assetFileName
    }
}