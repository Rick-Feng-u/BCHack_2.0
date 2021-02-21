import model from "./model"
import * as tf from '@tensorflow/tfjs';



MAX_MEMORY = 100000 //can change
BATCH_SIZE = 1000 //can change
LR = 0.001 // Learning rate: can change
class Agent{
    constructor(){
        this.num_games = 0;
        this.epsilon = 0 // randomness
        this.gamma = 0.85 // discount rate
        this.memeory = deque(maxlen = MAX_MEMORY) // popleft() if its exceed the memeory limit
        // TODO: model and trainer
    }

    get_state(game){
        continue;
    }

    remember(state, action, reward, new_state, game_over){
        this.memory.append((state, action, reward, nextState, game_over));
    }

    train_long_memory(){
        if(this.memeory.length() < BATCH_SIZE){
            const mini_sample = this.memeory;
        }
        else{
            const mini_sample = this.memeory[Math.floor(Math.random() * BATCH_SIZE)];
        }

        for (state, action, reward, nextState, game_over in mini_sample){
            this.trainer.train_step(state, action, reward, nextState, game_over);
        }
    }

    train_short_memory(){
        this.trainer.train_step(state, action, reward, nextState, game_over);
    }

    get_action(){
        this.epsilon = 80 - this.num_games;
        let final_move = [0,0,0];
        let randomMove = Math.random() * 200
        if(randomMove < this.epsilon){
            var move = parseInt(Math.random() * 2);
            final_move[move] = 1;

        }
        else{
            let state0 = tf.tensor(state, dtype=torch.float);
            let prediction = this.model(state0);
            move = tf.tf.math.argmax(prediction);
            final_move[move] = 1;
        }
    }

}

function train() {
    let total_score = 0
    let record = 0;
    let agent = new Agent;
    // game = ?

    while(true){
        let old_state = agent.get_state(game);

        let final_move = agent.get_action(old_state);

        let [reward, game_over, score] = game.play_step(final_move);

        let new_state = agent.getState(game);

        agent.train_short_memeory(old_state,final_move,reward,new_state,game_over);

        agent.remember(old_state,final_move,reward,new_state,game_over);

        if(game_over){
            game.reset();
            agent.num_games += 1
            agent.train_long_memory()

            if(score > record){
                record = score;
                agent.model.save();

            }
        }

        print("Game: ", agent.num_games, "Score: ", score, "highest score currently: ", record);

    }
}
