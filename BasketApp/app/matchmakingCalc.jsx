import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
//Pass in the ELO of the player. For outcome, 1 is a win for 1st player, 0 is a win for 2nd player.
function updateElo(Elo1, Elo2, outcome) {
    const K = 30; 

    function probability(rating1, rating2) {
        return 1 / (1 + Math.pow(10, (rating2 - rating1) / 200));
    }

    let Prob1 = probability(Elo1, Elo2);
    let Prob2 = probability(Elo2, Elo1);

    // Calculate new Elo ratings
    const newElo1 = Math.round(Elo1 + K * (outcome - Prob1));
    const newElo2 = Math.round(Elo2 + K * ((1 - outcome) - Prob2));

    return { newElo1, newElo2 };  // Return updated Elo ratings
}
export default updateElo;