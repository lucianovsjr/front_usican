import { makeStyles } from '@material-ui/styles';

const styles = theme => ({
    inputInline: {
        display: 'inline-block',
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit,
    },
    inputSm: { width: 140 },
    inputMd: { width: 280 },
    inputLg: { width: 420 },
    inputXLg: { width: 660 },
});

export default makeStyles(theme => styles(theme));
