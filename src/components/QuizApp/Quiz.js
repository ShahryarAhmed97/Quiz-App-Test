import React, { Component } from "react";
import quiz_Arr from "./Quiz.json";
import LoadingBar from "react-top-loading-bar";
import { Grid, Typography, Button } from "@material-ui/core";
import { Progress } from "reactstrap";
import PropTypes from "prop-types";
import { LinearProgress } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizArr: quiz_Arr,
      ite: 0,
      loadingBarProgress: 0,
      ansArr: [],
      currentAns: 0,
      progressBar: 0,
      right: Boolean
    };
  }

  nextQuestion() {
    const { quizArr, ite, currentAns, ansArr } = this.state;

    if (ite + 1 < quizArr.length) {
      let i = ite;
      let arr = [];
      ansArr.push(currentAns);

      this.state.loadingBarProgress += 5;
      this.setState(
        {
          ansArr: this.state.ansArr,
          ite: i + 1,
          loadingBarProgress: this.state.loadingBarProgress,
          right: currentAns == 0 ? false : true
        },
        () => {
          console.log("ansAerre", this.state.ansArr);
          var sum = ansArr.reduce((a, b) => a + b);
          this.setState({ progressBar: sum });
        }
      );
    } else {
      alert("completed");
    }
  }

  render() {
    const { quizArr, ite, right, progressBar } = this.state;
    console.log("quiz Arr==>", quizArr);

    return (
      <>
        <LoadingBar
          progress={this.state.loadingBarProgress}
          height={10}
          color="skyblue"
          onLoaderFinished={() => this.onLoaderFinished()}
        />

        <Grid container direction="row" justify="center" align="center" md={12}>
          <Grid
            id="headDiv"
            direction="column"
            justify="center"
            container
            item
            md={6}
          >
            <h1>
              Question {ite + 1} of {quizArr.length}{" "}
            </h1>
            <p>Entertainment Board games</p>
            <Rating
              name="read-only"
              height={5}
              value={
                (quizArr[ite].difficulty == "hard" && 3) ||
                (quizArr[ite].difficulty == "easy" && 1) ||
                (quizArr[ite].difficulty == "medium" && 2)
              }
              readOnly
            />
          </Grid>

          <Grid
            container
            id="questionDiv"
            direction="column"
            justify="center"
            md={12}
            style={{ textAlign: "center" }}
          >
            <h4 style={{ alignSelf: "center" }}>
              {" "}
              {decodeURIComponent(quizArr[ite].question)}
            </h4>
          </Grid>

          <Grid
            container
            id="optionsDiv"
            direction="row"
            justify="space-around"
            md={12}
            style={{ marginTop: "30px" }}
          >
            <Grid
              container
              item
              direction="column"
              alignItems="flex-end"
              justify="space-around"
              md={6}
            >
              {quizArr[ite].incorrect_answers.length > 1 && (
                <Button
                  variant="outlined"
                  onClick={() => this.setState({ currentAns: 0 })}
                >
                  {decodeURIComponent(quizArr[ite].incorrect_answers[2])}
                </Button>
              )}

              <br />

              <Button
                variant="outlined"
                onClick={() => this.setState({ currentAns: 1 })}
              >
                {decodeURIComponent(quizArr[ite].correct_answer)}
              </Button>
            </Grid>

            <Grid
              container
              item
              direction="column"
              alignItems="flex-start"
              justify="space-around"
              md={6}
            >
              <Button
                variant="outlined"
                onClick={() => this.setState({ currentAns: 0 })}
              >
                {decodeURIComponent(quizArr[ite].incorrect_answers[0])}
              </Button>
              <br />
              {quizArr[ite].incorrect_answers.length > 1 && (
                <Button
                  variant="outlined"
                  onClick={() => this.setState({ currentAns: 0 })}
                >
                  {decodeURIComponent(quizArr[ite].incorrect_answers[1])}
                </Button>
              )}
            </Grid>
          </Grid>

          <Grid item md={12} alignItems="center">
            {right ? <h2>Correct !</h2> : <h2>Sorry !</h2>}
          </Grid>
          <Grid item alignItems="center" md={12} style={{ marginTop: "30px" }}>
            <Button
              variant="outlined"
              style={{ alignSelf: "center" }}
              onClick={() => this.nextQuestion()}
            >
              Next Question
            </Button>
          </Grid>

          <Grid
            container
            item
            direction="row"
            id="progressBarDiv"
            md={12}
            style={{ marginTop: "30px" }}
          >
            <Grid
              item
              direction="column"
              justify="flex-end"
              align="flex-end"
              md={6}
            >
              <h5 style={{ marginLeft: "30px" }}>Sorce : 65 %</h5>
            </Grid>

            <Grid
              item
              direction="column"
              justify="flex-start"
              justify="space-between"
              align="flex-start"
              md={6}
            >
              <h5 style={{ marginRight: "30px" }}>Max Score: 75 %</h5>
            </Grid>
          </Grid>
          <Grid item id="progressBarDiv" md={6} style={{}}>
            <LinearProgress
              variant="buffer"
              value={progressBar * 2}
              valueBuffer={70}
              style={{
                height: "30px",
                border: "1px solid blue",
                borderRadius: "5px"
              }}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}
