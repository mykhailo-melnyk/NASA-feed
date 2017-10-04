import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Container, Label } from 'semantic-ui-react';
import { getNeoActiveDays } from '../../selectors/neo';
import { NeoActions } from '../../actions/neo';
import { NeoService } from '../../services';
import Loader from '../../components/Loader';

const START_DATE = moment('2017-09-01T23:59:59');

@connect(state => ({
  activeDays: getNeoActiveDays(state),
}))

class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    activeDays: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.string.isRequired,
        neos: PropTypes.arrayOf(PropTypes.object),
      }),
    ),
  };

  static defaultProps = {
    activeDays: [],
  };

  constructor(props) {
    super(props);
    this.dayToFetch = START_DATE;

    this.neoService = new NeoService();
  }

  componentDidMount() {
    this.props.dispatch(NeoActions.startFeed(this.dayToFetch));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.activeDays) {
      this.neoService.setDays(nextProps.activeDays);
    }
  }

  render() {
    const days = this.neoService.days;

    return (<div>
      <Container style={{ marginTop: '2em', textAlign: 'center' }}>
        <h1>Information about near orbital objects</h1>
        {days.length ?
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Max estimated diameter</Table.HeaderCell>
                <Table.HeaderCell>Potentially hazardous NEOs</Table.HeaderCell>
                <Table.HeaderCell>Closest NEO</Table.HeaderCell>
                <Table.HeaderCell>Fastest NEO</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {days.map(day => (
                <Table.Row key={day.day} negative={!!this.neoService.isHazardous(day)}>
                  <Table.Cell>{day.day}</Table.Cell>
                  <Table.Cell>{NeoService.getMaxEstimatedDiameterOfTheDay(day)} <Label color="blue" size="mini">km</Label></Table.Cell>
                  <Table.Cell>{NeoService.getPotentialHazardsForTheDay(day)}</Table.Cell>
                  <Table.Cell>{NeoService.closestNeoOfTheDay(day)} <Label color="blue" size="mini">km</Label></Table.Cell>
                  <Table.Cell>{NeoService.fastestNeoOfTheDay(day)} <Label color="blue" size="mini">km/h</Label></Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          :
          <Loader />
        }
      </Container>
    </div>);
  }
}


export default withRouter(Home);
