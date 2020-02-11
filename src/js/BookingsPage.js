import React from 'react';
import Booking from './Booking'
import { withRouter } from "react-router-dom";
import { Icon, Select, Dropdown } from "semantic-ui-react"
import '../css/BookingsPage.css'
import InfiniteScroll from 'react-infinite-scroller';

const options = [
  { value: 'id', text: 'Booking id' },
  { value: 'owner', text: 'User id' },
  { value: 'username', text: 'Name' },
  { value: 'itemId', text: 'Item id' },
  { value: 'details', text: 'Item info' },
];

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      bookingIdAsc: false,
      userIdAsc: null,
      userNameAsc: null,
      itemIdAsc: null,
      startDateAsc: null,
      isLoading: false,
      pageNumber: 0,

      //test
      testBookings: [],
      testNextPage: 1,
      testHasMoreItems: true,
      cardToShow: null,
      searchSelected: null,

      //filters
      filterActive: '',
      filterItemType: '',
      filterDateFrom: '',
      filterDateTo: ''
    }
    //this.loadBookings = this.loadBookings.bind(this);
    this.ElementXD = this.ElementXD.bind(this);
    this.handlerBID = this.handlerBID.bind(this);
    this.handlerSD = this.handlerSD.bind(this);
    this.handlerUId = this.handlerUId.bind(this);
    this.hanlderIID = this.hanlderIID.bind(this);
    this.hanlderUName = this.hanlderUName.bind(this);
    //this.componentDidMount = this.componentDidMount.bind(this);

    //test
    this.testLoadItems = this.testLoadItems.bind(this);
    this.sortInfiteScroll = this.sortInfiteScroll.bind(this);

    //filtering
    this.handlerFilterActive = this.handlerFilterActive.bind(this);
    this.handlerFilterDateFrom = this.handlerFilterDateFrom.bind(this);
    this.handlerFilterDateTo = this.handlerFilterDateTo.bind(this);
    this.handlerFilterItemType = this.handlerFilterItemType.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }

  getCookieValue = (key) => {
    return document.cookie.replace(`/(?:(?:^|.*;\s*)${key}\s*\=\s*([^;]*).*$)|^.*$/, "$1"`).split("=")[1];
  }

  // loadBookings() {
  //   this.setState({
  //     isLoading: true
  //   });

  //   fetch(`http://minibookly.us-east-1.elasticbeanstalk.com/bookings?pageSize=${11}&pageNumber=${this.state.pageNumber}`, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${this.getCookieValue('token')}`
  //     }
  //   })
  //     .then(response => {
  //       //console.log(response.status)
  //       return response.json();
  //     })
  //     .then(data => this.setState({ bookings: data.bookingForms }))
  //     .then(() => this.setState({ isLoading: false }));

  // }

  // helper function for sorting
  mySort = (a, b, cond) => {
    if (!cond)
      return a < b ? 1 : -1;
    else {
      return a > b ? 1 : -1;
    }
  }

  // sorting by booking id handler
  handlerBID = () => {
    if (!this.state.bookings) {
      return;
    }
    if (this.state.bookingIdAsc === null) {
      this.state.bookingIdAsc = true; // i know this is stupid but it works (same for all sorting handlers)
    }
    var sorted = this.state.bookings.sort((a, b) => this.mySort(a.id, b.id, this.state.bookingIdAsc))
    this.setState(prevstate => ({
      bookings: sorted,
      bookingIdAsc: !prevstate.bookingIdAsc,
      userIdAsc: null,
      userNameAsc: null,
      itemIdAsc: null,
      startDateAsc: null,
    }))
    // console.log("booking id: ", this.state.bookingIdAsc))
  }

  // sorting by user id handler
  handlerUId = () => {
    if (!this.state.bookings) {
      return;
    }
    if (this.state.userIdAsc === null) {
      this.state.userIdAsc = true; // check handlerBID
    }
    var sorted = this.state.bookings.sort((a, b) => this.mySort(a.owner, b.owner, this.state.userIdAsc))
    this.setState(prevstate => ({
      bookings: sorted,
      userIdAsc: !prevstate.userIdAsc,
      bookingIdAsc: null,
      userNameAsc: null,
      itemIdAsc: null,
      startDateAsc: null,
    }))
    // console.log("User id: ", this.state.userIdAsc))
  }
  // sorting by user name handler  
  hanlderUName = () => {
    if (!this.state.bookings) {
      return;
    }
    if (this.state.userNameAsc === null) {
      this.state.userNameAsc = true; // check handlerBID
    }
    var sorted = this.state.bookings.sort((a, b) => this.mySort(a.username, b.username, this.state.userNameAsc))
    this.setState(prevstate => ({
      bookings: sorted,
      userNameAsc: !prevstate.userNameAsc,
      bookingIdAsc: null,
      userIdAsc: null,
      itemIdAsc: null,
      startDateAsc: null,
    }))
    // cnsole.log("user name: ", this.state.userNameAsc))
  }
  // sorting by item id handler
  hanlderIID = () => {
    if (!this.state.bookings) {
      return;
    }
    if (this.state.itemIdAsc === null) {
      this.state.itemIdAsc = true; // check handlerBID
    }
    var sorted = this.state.bookings.sort((a, b) => this.mySort(a.itemId, b.itemId, this.state.itemIdAsc))
    this.setState(prevstate => ({
      bookings: sorted,
      itemIdAsc: !prevstate.itemIdAsc,
      bookingIdAsc: null,
      userIdAsc: null,
      userNameAsc: null,
      startDateAsc: null,
    }))
    // console.log("item id:", this.state.itemIdAsc))
  }
  // sorting by start date handler
  handlerSD = () => {
    if (!this.state.bookings) {
      return;
    }
    if (this.state.startDateAsc === null) {
      this.state.startDateAsc = true; // check handlerBID
    }
    var sorted = this.state.bookings.sort((a, b) => this.mySort(a.startDateTime, b.startDateTime, this.state.startDateAsc))
    this.setState(prevstate => ({
      bookings: sorted,
      startDateAsc: !prevstate.startDateAsc,
      bookingIdAsc: null,
      userIdAsc: null,
      userNameAsc: null,
      itemIdAsc: null,
    }))
    // console.log("start date", this.state.startDateAsc))
  }

  ElementXD = (value, hanlder, cond, sortable) => {
    if (sortable) {
      return (
        <div className="col-md-3 text-left Clickable" onClick={hanlder}>
          {value}
          {cond === null ? <div></div>
            : cond ? <Icon name='caret down' style={{}} />
              : <Icon name='caret up' style={{}} />}
        </div>
      )
    }
    else {
      return (
        <div className="col-md-3 text-left">
          {value}
        </div>
      )
    }
  }

  //fetch(`http://minibookly.us-east-1.elasticbeanstalk.com/bookings?pageSize=${5}&pageNumber=${this.state.testNextPage}`, {
  // http://localhost:3004/bookings?_page=0&_limit=10

  // fetching used in infinite scroll component
  testLoadItems(page) {
    fetch(`http://minibookly.us-east-1.elasticbeanstalk.com/bookings?pageSize=${10}&pageNumber=${page}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.getCookieValue('token')}`
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        else if (response.status === 403) {
          alert('You have been logged out of your session, please login in again!');
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
          this.props.history.push("/");
        }
      })
      .then(data => {
        var testNewState = this.sortInfiteScroll(this.state.bookings.concat(data.bookingForms))
        //console.log(this.sortInfiteScroll(this.state.bookings.concat(data.bookingForms)));
        this.setState(prevstate => ({
          bookings: testNewState,
          testHasMoreItems: data.isNext,
          testNextPage: prevstate.testNextPage + 1
        }))
      })
  }

  // sort new data handler
  sortInfiteScroll = (bookings) => {
    if (this.state.bookingIdAsc !== null) {
      if (this.state.bookingIdAsc) {
        return bookings.sort((a, b) => this.mySort(a.id, b.id, !this.state.bookingIdAsc));
      } else {
        return bookings;
      }
    } else if (this.state.userIdAsc !== null) {
      return bookings.sort((a, b) => this.mySort(a.owner, b.owner, !this.state.userIdAsc));
    } else if (this.state.userNameAsc !== null) {
      return bookings.sort((a, b) => this.mySort(a.username, b.username, !this.state.userNameAsc));
    } else if (this.state.itemIdAsc !== null) {
      return bookings.sort((a, b) => this.mySort(a.itemId, b.itemId, !this.state.itemIdAsc));
    } else if (this.state.startDateAsc !== null) {
      return bookings.sort((a, b) => this.mySort(a.startDateTime, b.startDateTime, !this.state.startDateAsc));
    } else {
      return;
    }
  }

  handlerShowSearchFilter = (str) => {
    var xd = null;
    if (this.state.cardToShow === null || this.state.cardToShow !== str) {
      xd = str;
    } else if (this.state.cardToShow === str) {
      xd = null;
    }
    this.setState({ cardToShow: xd })
    this.clearFilters();
  }

  clearFilters = () => {
    this.setState({
      filterActive: '',
      filterDateFrom: '',
      filterDateTo: '',
      filterItemType: '',
      searchSelected: null
    })
  }
  // to do !
  handlerSearchButton = () => {
    //this.setState({ testHasMoreItems: true, bookings: [] })
    //this.scroller.pageLoaded = 0;
    //console.log(this.state)
  }

  handlerFilterItemType = (e) => {
    if (e.target.value === 'xdType') {
      this.setState({ filterItemType: '' });
    } else {
      this.setState({ filterItemType: e.target.value })
    }
  }

  handlerFilterActive = (e) => {
    var xd = e.target.value === 'on' ? true : false;
    this.setState({ filterActive: xd })
  }

  handlerFilterDateFrom = (e) => {
    this.setState({ filterDateFrom: e.target.value })

  }

  handlerFilterDateTo = (e) => {
    this.setState({ filterDateTo: e.target.value })
  }

  render() {
    const header = (
      <div className="card bg-primary text-white cardBP">
        <div className="card-header">
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                {this.ElementXD("Booking id", this.handlerBID, this.state.bookingIdAsc, 1)}
                {this.ElementXD("User id", this.handlerUId, this.state.userIdAsc, 1)}
                {this.ElementXD("Name", this.hanlderUName, this.state.userNameAsc, 1)}
                {this.ElementXD("Item id", this.hanlderIID, this.state.itemIdAsc, 1)}
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                {this.ElementXD("Item type", null, null, 0)}
                <div className="col-md-3 text-left">
                  Item info
                  <Icon name='info circle' className="infoIcon" onClick={() => alert("Click booking for detials;\n\nItem info for specific items:\n\nCar: Plate number\nFlat: Address\nParking: Street ParkingNumber")} />
                </div>
                {this.ElementXD("Active", null, null, 0)}
                {this.ElementXD("Start date", this.handlerSD, this.state.startDateAsc, 1)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    const loader = (
      <div className="spinner-border text-primary " style={{ clear: "both" }}></div>
    )

    // to do !
    const cardSearch = (
      <div className="card-body text-left">
        <div className="row">
          <div className="col-md-8">
            <Dropdown
              clearable
              fluid
              multiple
              options={options}
              search
              selection
              placeholder='Select fields to search by'
              onChange={(e, data) => {
                this.setState({ searchSelected: data.value });
              }}
            />
          </div>
          <div className="col-md-4">
            <div className="ui action input" style={{ marginRight: "3em" }}>
              <input type="text" placeholder="Search..." />
              <button className="ui icon button" onClick={this.handlerSearchButton} disabled>
                <i className="search icon"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

    )

    // to do !
    const cardFilter = (
      <div className="card-body">
        <div className="row">
          <div className="col-md-3">
            <label className="label">Booking state</label>
          </div>
          <div className="col-md-3">
            <label className="label">Item type</label>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <label className="label">Date from</label>
              </div>
              <div className="col-md-6 text-left">
                <label className="label">Date to</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row"  >
          <div className="col-md-3 form-group">
            <select className="form-control" onChange={this.handlerFilterItemType}>
              <option value="xdState">Any state</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="col-md-3 form-group">
            <select className="form-control" onChange={this.handlerFilterItemType}>
              <option value="xdType">Any type</option>
              <option value="car">Car</option>
              <option value="flat">Flat</option>
              <option value="parking">Parking</option>
            </select>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <input type="date" className="form-control" onChange={this.handlerFilterDateFrom} />
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <input type="date" className="form-control" onChange={this.handlerFilterDateTo} />
                  </div>
                  <div className="col-md-6">
                    <button type="button" className="form-control bg-info text-white" disabled>Filter list</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )

    const cardNone = (
      <div style={{ display: "none" }} />
    )

    const { cardToShow } = this.state;

    const cardSearchFilter = (
      <div className="card text-white bg-secondary mb-3 cardSF">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a className={cardToShow === 'cardSearch' ? "nav-link active" : "nav-link"} onClick={() => this.handlerShowSearchFilter('cardSearch')}>Search</a>
            </li>
            <li className="nav-item">
              <a className={cardToShow === 'cardFilter' ? "nav-link active" : "nav-link"} onClick={() => this.handlerShowSearchFilter('cardFilter')}>Filter</a>
            </li>
          </ul>
        </div>
        {cardToShow === null ? cardNone : cardToShow === 'cardSearch' ? cardSearch : cardFilter}
      </div>
    )

    const noBookings = (
      <div>
        XD
      </div>
    )

    if (this.state.bookings) {
      var items = [];
      this.state.bookings.map(booking => {
        //console.log(this.state.bookings)
        items.push(
          <Booking booking={booking} key={booking.id} />
        )
      })
      //console.log(this.state.testBookings)
      var cond = this.state.startDateAsc || this.state.itemIdAsc || this.state.userNameAsc || this.state.userIdAsc || this.state.bookingIdAsc;
      const testListBookings = (
        <InfiniteScroll
          loadMore={this.testLoadItems}
          hasMore={this.state.testHasMoreItems}
          loader={loader}
          threshold={5}
          isReverse={cond}
          ref={scroller => this.scroller = scroller}
        >
          {items.length === 0 && !this.state.testHasMoreItems ? noBookings : items}
        </InfiniteScroll>
      )
      return (
        <div>
          {cardSearchFilter}
          {header}
          {testListBookings}
        </div>
      )
    } else {
      return <div>Unexpected error!</div>
    }

  }
}

export default withRouter(Bookings)

// checkbox for active/inactive
{/* <div className="custom-control custom-checkbox">
  <input type="checkbox" className="custom-control-input" id="customCheck1"  onClick={this.handlerFilterActive}/>
  <label className="custom-control-label" htmlFor="customCheck1">Active</label>
</div> */}