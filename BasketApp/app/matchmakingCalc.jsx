import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { setElo, setLookingForMatch, getPlayingAgainst, getLookingForMatch, getPrevScore, getElo } from './database';
//Pass in the usernames of the player. For outcome, 1 is a win for 1st player, 0 is a win for 2nd player.

const updateElo = async (userName) => {
    const opponent = await getPlayingAgainst(userName);
    const userLooking = await getLookingForMatch(userName);
    const opponentLooking = await getLookingForMatch(opponent);
  
    if (userLooking === 2 && opponentLooking === 2) {
      const userScore = await getPrevScore(userName);
      const opponentScore = await getPrevScore(opponent);
  
      const outcome = userScore > opponentScore ? 1 : userScore === opponentScore ? 0.5 : 0;
  
      const K = 30;
      const Elo1 = getElo(Player);
      const Elo2 = getElo(Opponent);
      function probability(rating1, rating2) {
          return 1 / (1 + Math.pow(10, (rating2 - rating1) / 200));
      }
  
      let Prob1 = probability(Elo1, Elo2);
      let Prob2 = probability(Elo2, Elo1);
  
      // Calculate new Elo ratings
      const newElo1 = Math.round(Elo1 + K * (outcome - Prob1));
      const newElo2 = Math.round(Elo2 + K * ((1 - outcome) - Prob2));
      setElo(Player, newElo1); // Update Elo rating for Player
      setElo(Opponent, newElo2); 
      setLookingForMatch(Player, 0); // Reset playing against status for Player
      setLookingForMatch(Opponent, 0); 
      console.log(`New Elo for ${Player}: ${newElo1}`);
      console.log(`New Elo for ${Opponent}: ${newElo2}`);
  }}
  export default updateElo;
