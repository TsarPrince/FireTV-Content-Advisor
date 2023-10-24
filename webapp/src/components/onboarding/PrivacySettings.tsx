import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import SecurityIcon from "@mui/icons-material/Security";
import AdsClickIcon from "@mui/icons-material/AdsClick";

const PrivacySettings = ({
  initialData,
  onChange,
}: {
  initialData?: string[];
  onChange: (data: string[]) => void;
}) => {
  const [checked, setChecked] = React.useState<string[]>(
    initialData ?? ["data"]
  );

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(() => {
      onChange(newChecked);
      return newChecked;
    });
  };

  return (
    <>
      <h1>Privacy Settings</h1>

      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        subheader={<ListSubheader>Settings</ListSubheader>}
      >
        <ListItem>
          <ListItemIcon>
            <SecurityIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-data" primary="Share your data" />
          <Switch
            edge="end"
            onChange={handleToggle("data")}
            checked={checked.indexOf("data") !== -1}
            inputProps={{
              "aria-labelledby": "switch-list-label-data",
            }}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AdsClickIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-ads" primary="Ads" />
          <Switch
            edge="end"
            onChange={handleToggle("ads")}
            checked={checked.indexOf("ads") !== -1}
            inputProps={{
              "aria-labelledby": "switch-list-label-ads",
            }}
          />
        </ListItem>
      </List>
    </>
  );
};

export default PrivacySettings;
