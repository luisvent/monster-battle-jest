import {Monster} from "./monster.interface";

export interface BattleWinner {
  winner: Monster;
  tie: boolean;
}
