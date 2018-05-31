interface IArtist {
    id?: number;
    name?: string;
    sex?: number;
    yearofbirth?: number;
    country?: ICountry
}
interface ICountry {
    id?: number;
    name: string;
}
interface IGenre {
    id?: number;
    name?: string
}
interface ICategory {
    id?: number;
    name: string
}
interface ISong {
    id?: number;
    name?: string;
    genre?: IGenre;
    singer?: IArtist;
    album?: any;
}
interface IAlbum {
    id?: number;
    name?: string;
    price?: number;
    genre?: IGenre;
    artist?: IArtist;
    releasedate?: number;
    cover?: string;
    quantity?: number;
    songs?: ISong[];
    status?: number;
    description?: string
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
interface IOrder {
    id?: number;
    date: number;
    details?: IDetailsOrder[];
    customer?: IUser;
    status?: number
}
interface IDetailsOrder {
    id?: number;
    quantity?: number;
    album?: IAlbum;
    order?: IOrder
}
interface IUser {
    id?: number;
    username?: string;
    password?: string;
    name?: string;
    address?: string;
    phone?: string;
    role?: string;
    email?: string;
    token?: string;
}
class FileUpload {
 
    key: string;
    name: string;
    url: string;
    file: File;
    constructor() {
    }

}
export {
    IArtist,
    IAlbum,
    IGenre,
    ICountry,
    FileUpload,
    IDetailsOrder,
    IOrder,
    ISong,
    IUser
};