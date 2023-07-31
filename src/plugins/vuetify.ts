import Vue from 'vue';
import { colors } from 'vuetify/lib';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme:{
        dark:true,
        themes:{
            light:{
                primary:colors.pink.lighten1,
                error:'#B00020'
            },
            dark:{
                primary:colors.amber.accent4,
                secondary:colors.blue.darken3,
            }
        }
    }
});
