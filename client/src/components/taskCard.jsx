import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

const TaskCard = () => {
  return (
    <Card variant="outlined" className="card">
      <Typography color="textSecondary" gutterBottom>
        Word of the Day
      </Typography>
    </Card>
  );
};

export default TaskCard;
