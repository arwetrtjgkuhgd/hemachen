import Vue from 'vue'
import moment from "moment"

Vue.filter("formatime", function (value) {
    // console.log(value);
    return moment(value).format("YYYY-MM-DD")
})