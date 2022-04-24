import { PersistentUnorderedMap, math, u128, base64, base58, Context, PersistentMap, PersistentSet } from "near-sdk-as";

export const tournaments = new PersistentUnorderedMap<u32, Tournament>("t");

// check this out for generateUniqueID function
// https://stackoverflow.com/questions/69684748/how-to-create-a-uid-in-assemblyscript-for-a-near-contract

export function generateUniqueID(): u32 {
  const title = Context.sender.substring(0, Context.sender.lastIndexOf("."));
  return math.hash32(title + "-" + Context.blockIndex.toString());
}

@nearBindgen
export class Tournament {
  id: u32; //unique id for tournaments
  publisher: string; //tournament publisher
  description: string; //tournament description
  name: string; // tournament name
  imgUrl: string; //image url
  tournamentFee: u32; //tournament entry fee
  vote: i8; // voting down or up for users
  applicants: Array<string> = [];

  constructor(description: string, tournamentFee: u16, name: string, imageUrl: string) {
    this.id = generateUniqueID();
    this.publisher = Context.sender;
    this.name = name;
    this.description = description;
    this.tournamentFee = tournamentFee;
    this.imgUrl = imageUrl;
    this.vote = 0;
  }
}
