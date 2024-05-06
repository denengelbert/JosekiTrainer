import db from '$lib/db/db'
import {createEmptyCard, formatDate, fsrs, generatorParameters, Rating, Grades} from 'ts-fsrs';
import type {Card as SRSCard} from 'ts-fsrs';
import type { Move } from './moves';

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
const params = generatorParameters();
const srs_algorithm = fsrs(params);

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
export async function update_card(card: Card) {

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
            stack: 1,
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





