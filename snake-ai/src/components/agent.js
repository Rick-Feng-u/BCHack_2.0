import model from "./model"
MAX_MEMORY = 100_000 //can change
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
        continue;
    }

    train_long_memory(){
        continue;
    }

    train_short_memory(){
        continue;
    }

    get_action(){
        continue;
    }

}

function train() {
    const total_score = 0
    const record = 0;
    let agent = new Agent;
    // game = ?

    while(true){
        const old_state = agent.get_state(game);

        const final_move = agent.get_action(old_state);

    }
}
