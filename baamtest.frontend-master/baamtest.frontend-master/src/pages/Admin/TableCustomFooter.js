import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { PER_PAGE_TABLES, toFA } from '../../utils/Utils';
import { TableFooter, TablePagination, TableRow } from "@material-ui/core";

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});




class TablePaginationActions extends React.Component {
  constructor(props) {
    super(props);
  }
  handleFirstPageButtonClick = event => {
    // this.props.onChangePage(event, 0);
    this.props.onPageChange(event, 0);
  };

  handleBackButtonClick = event => {
    // this.props.onChangePage(event, this.props.page - 1);
    this.props.onPageChange(this.props.page - 1);
  };

  handleNextButtonClick = event => {
    // this.props.onChangePage(event, this.props.page + 1);
    this.props.onPageChange(this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    // this.props.onChangePage(
    //   event,
    //   Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    // );
    this.props.onPageChange(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;
    console.log(this.props);
    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction !== 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction !== 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction !== 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction !== 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}
TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

export const TableCustomFooter = (props) => (
  <TableFooter>
    <TableRow>
      <TablePagination
        count={props.count}
        rowsPerPage={props.rowsPerPage}
        page={props.page}
        onChangePage={(_, page) => {
          props.setPage(page)
          props.changePage(page)
        }}
        labelDisplayedRows={({ from, to, count }) => {
          return `${toFA(from)}-${toFA(to)} از ${count !== -1 ? toFA(count) : `بیشتر از ${toFA(to)}`}`;
        }}
        labelRowsPerPage="تعداد سطر در هر صفحه :"
        onChangeRowsPerPage={e => {
          props.changeRowsPerPage(e.target.value)
          props.setPerPageTable(e.target.value)
          props.setPage(0)
        }}
        rowsPerPageOptions={[PER_PAGE_TABLES, 20, 30].map(el => { return { label: toFA(el), value: el } })}
        ActionsComponent={TablePaginationActionsWrapped}
      />
    </TableRow>
  </TableFooter>
)