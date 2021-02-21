import * as tf from '@tensorflow/tfjs';

class Linear_Qnnet{
    constructor(input, hidden, output){
            this.input_nodes = input;
            this.hidden_nodes = hidden;
            this.output_nodes = output;
            this.model = this.createModel();
          }
          createModel(){
            const model = tf.sequential();
            model.add(tf.layers.conv2d({
              filters: 128,
              kernelSize: 3,
              strides: 1,
              activation: 'relu',
              inputShape: [h, w, 2]
            }));
            model.add(tf.layers.batchNormalization());
            model.add(tf.layers.conv2d({
              filters: 256,
              kernelSize: 3,
              strides: 1,
              activation: 'relu'
            }));
            model.add(tf.layers.batchNormalization());
            model.add(tf.layers.conv2d({
              filters: 256,
              kernelSize: 3,
              strides: 1,
              activation: 'relu'
            }));
            model.add(tf.layers.flatten());
            model.add(tf.layers.dense({units: 100, activation: 'relu'}));
            model.add(tf.layers.dropout({rate: 0.25}));
            model.add(tf.layers.dense({units: numActions}));
          
            return model;
          }
    }
