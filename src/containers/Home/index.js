import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import { Table, Container, Label } from 'semantic-ui-react';
import { getNeoActiveDays } from '../../selectors/neo';
import { NeoActions } from '../../actions/neo';
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

    this.state = {
      days: [],
      hazardousDays: [],
    };
  }

  componentDidMount() {
    this.props.dispatch(NeoActions.startFeedProcess(this.dayToFetch));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.activeDays) {
      this.setDays(nextProps.activeDays);
    }
  }

  setDays = (days) => {
    this.setState({ days });
    this.update();
  };

  getPotentialHazards = day => (
    _.filter(day.neos, neo => neo.is_potentially_hazardous_asteroid).length
  );

  getMaxDiameterOfTheDay = day => (
    _.maxBy(day.neos, neo => neo.estimated_diameter.kilometers.estimated_diameter_max)
      .estimated_diameter.kilometers.estimated_diameter_max
  );


  speedyNeoOfTheDay = day => (
    _.chain(day.neos)
      .map(neo => neo.close_approach_data)
      .flatten()
      .map(approach => approach.relative_velocity.kilometers_per_hour)
      .sort()
      .last()
      .value()
  );

  nearestNeoOfTheDay = ({ day }) => (
    _.chain(day.neos)
      .map(neo => neo.close_approach_data)
      .flatten()
      .map(approach => approach.miss_distance.kilometers)
      .sort()
      .head()
      .value()
  );

  isHazar(day) {
    return this.state.hazardousDays.includes(day);
  }

  update = () => {
    const days = this.state.days;
    const hazardousDays = _.chain(days)
      .sortBy(day => this.getPotentialHazards(day))
      .slice(days.length - 2, days.length)
      .value();
    this.setState({ hazardousDays });
  };

  render() {
    const days = this.state.days;

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
                <Table.Row key={day.day} negative={!!this.isHazar(day)}>
                  <Table.Cell>{day.day}</Table.Cell>
                  <Table.Cell>{this.getMaxDiameterOfTheDay(day)}
                    <Label color="blue" size="mini">km</Label>
                  </Table.Cell>
                  <Table.Cell>{this.getPotentialHazards(day)}</Table.Cell>
                  <Table.Cell>{this.nearestNeoOfTheDay(day)}
                    <Label color="blue" size="mini">km</Label>
                  </Table.Cell>
                  <Table.Cell>{this.speedyNeoOfTheDay(day)}
                    <Label color="blue" size="mini">km/h</Label>
                  </Table.Cell>
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
