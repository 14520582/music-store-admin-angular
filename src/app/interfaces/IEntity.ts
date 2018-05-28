interface IArtist {
    id: number;
    name: string;
    sex: number;
    yearofbirth: number;
    country: ICountry
}
interface ICountry {
    id?: number;
    name: string;
}
interface IGenre {
    id?: number;
    name: string
}
interface ICategory {
    id?: number;
    name: string
}
interface IAlbum {
    id: number;
    name: string;
    price: number;
    genre: IGenre;
    artist: IArtist;
    releasedate: number;
    cover: string
}
interface IRealEstate {
    id: number;
    title: string;
    price: string;
    description: string;
    address: any;
    area: string;
    type: string;
    cover: string
}
interface IUser {
    id: number;
    username: string;
    password: string;
    name: string;
    address: string;
    role: string;
    token: string;
}
export {
    IArtist,
    IAlbum,
    IGenre,
    ICountry,
    IUser
};