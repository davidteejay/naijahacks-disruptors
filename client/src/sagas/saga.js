import { put, all, take, delay, call, takeEvery } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import axios from "axios";

function* startListener() {
  // // #1: Creates an eventChannel and starts the listener;
  const channel = new eventChannel(emiter => {
    const listener = axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(response => {
        emiter({
          data: response.data || {}
        });
      });

    //   // #2: Return the shutdown method;
    return () => {
      listener.off();
    };
  });

  // // #3: Creates a loops to keep the execution in memory;
  while (true) {
    const { data } = yield take(channel);

    //   // #4: Pause the task until the channel emits a signal and dispatch an action in the store;

    yield put({
      type: "FETCH_DATA_ASYNC",
      data
    });
  }
}

// this action listens for every CREATE_NEW_DATA action by the dispatch in todoform.js which then calls the callSubmit function
function* saveDataSaga() {
  yield takeEvery("CREATE_NEW_DATA", callSubmit);
}

// passes the data from the action data that was dispatched, into submitToserver function
function* callSubmit(action) {
  yield call(submitToServer, action.data);
}

// finally gets the data and post to api
const submitToServer = async data => {
  // await axios
  //   .post(`url`, data)
  //   .then(res => {
  //     console.log(res);
  //     console.log(res.data, "my data here");
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  console.log(data); // Testing if the data is being captured
};

export default function* root() {
  yield all([startListener(), saveDataSaga()]);
}
