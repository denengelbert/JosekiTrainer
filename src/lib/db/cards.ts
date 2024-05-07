import db from '$lib/db/db'
import {createEmptyCard, formatDate, fsrs, generatorParameters, Rating, Grades} from 'ts-fsrs';
import type {Card as SRSCard} from 'ts-fsrs';
import { empty_Move, type Move } from './moves';

export interface Card {
    id: number,
    owner: number, 
    move: Omit<Move, "id" | "owner">, 
    quest_type: string, 
    collection: string,
    buried: boolean,
    srs: SRSCard,
}
let cards_db = db.collection<Card>('reviews')
const params = generatorParameters({w:[0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14, 0.94, 2.18, 0.05, 0.34, 1.26, 0.29, 2.61] });
export const srs_algorithm = fsrs(params);

export default db.collection('reviews')

export function empty_card( owner: number = 1, move: Move, quest_type = 'next_move', stack:string = 'default'): Card{
    return {
            id: -1,
            owner: owner, 
            move: move, 
            quest_type: quest_type, 
            collection: stack,
            buried: false,
            srs: createEmptyCard(),
    }
}

export async function insert_card(card: Card) {
    insert_cards([card]);
}
export async function insert_cards(cards: Card[]) {
    try {
        const ids = await cards_db.find({},  { projection: {
            _id: 0,
            id: 1,
        }}).toArray();
        let max_id = ids.length;
        for (let i = 0; i < cards.length; i++) 
            cards[i].id = i+Math.max(0, 1+max_id);
        console.log(cards);
        const result = await cards_db.insertMany(cards);
        console.log(`${result.insertedCount} new cards inserted`);
      } catch(err) {
        console.log("Could not insert card successfully: ", err);
      }  
}
export async function update_card(card_id:number, srs:SRSCard) {
  try {
    const query = { id: card_id as number};
    console.log(query);
    const fetch = await cards_db.findOne(query);


    const result =  await cards_db.updateOne(query, 
      {$set: { srs : srs}});
   if (result && result.matchedCount) {
    console.log(`Successfully updated card with id ${card_id}`);
    } else if (!result) {
    console.log(`Failed to update card with id ${card_id}`);
    } else if (!result.matchedCount) {
      console.log(result);
    console.log(`Card with id ${card_id} does not exist`);
    }
  } catch(err) {
    console.log("Could not update card ${card.id} successfully: ", err);
  }  
}
export async function delete_card(card_id:number) {
  try {
    const query = { id: card_id};
    console.log(query);
    const result =  await cards_db.deleteOne(query);
   if (result && result.deletedCount) {
    console.log(`Successfully removed card with id ${card_id}`);
  } else if (!result) {
    console.log(`Failed to remove move with id ${card_id}`);
  } else if (!result.deletedCount) {
    console.log(`Card with id ${card_id} does not exist`);
}
} catch(err) {
  console.log("Could not delete card ${card.id}successfully: ", err);
}  
}
export async function fetch_card_by_id(id:number): Promise<Card> {
  let cards:Card[] = [];
  try {
      cards = await cards_db.find({id:id},  { projection: {
          _id: 0,
          id: 1,
          owner: 1, 
          move: 1, 
          quest_type: 1, 
          collection: 1,
          buried: 1,
          srs: 1,
      }}).toArray();
    } catch(err) {
      console.log("Could not fetch existing cards: ", err);
    } 
    if (cards.length == 0)
      return empty_card(1, empty_Move());
    else {
     // console.log(cards);
      return cards[0];
    
    }
}

export async function fetch_cards(owner: number): Promise<Card[]> {
    let cards = null;
    try {
        cards = await cards_db.find({owner: owner},  { projection: {
            _id: 0,
            id: 1,
            owner: 1, 
            move: 1, 
            quest_type: 1, 
            collection: 1,
            buried: 1,
            srs: 1,
        }}).toArray();
      } catch(err) {
        console.log("Could not fetch existing cards: ", err);
      } 
      if (cards === null)
        return [];
      else
        return cards;
}


export async function fetch_scheduled_cards(owner: number): Promise<Card[]> {
    let cards = await fetch_cards(owner);
    if (cards === null)
      return [];
    else { 
      return cards.filter((card) => Date.parse(card.srs.due.toISOString()) < Date.now());
    }
}





