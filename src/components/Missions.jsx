import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import '../styles/missions.css';
import {
  startLoading, endLoading, setMissions, missionJoinedByUser,
} from '../redux/missionsSlice';
import { getMissionsApi } from '../redux/missionApi';

const Missions = () => {
  const { missionList, joinedIds } = useSelector((store) => store.mission);
  const dispatch = useDispatch();

  const fetchMissions = async () => {
    dispatch(startLoading());
    const missions = await getMissionsApi();
    dispatch(endLoading());
    dispatch(setMissions(missions));
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  const handleReservation = (missionId) => {
    dispatch(missionJoinedByUser(missionId));
  };

  const isMissionJoined = (missionId) => joinedIds.includes(missionId);

  if (missionList) {
    return (
      <div className="custom-container">
        {missionList.map((mission) => (
          <div key={mission.mission_id}>
            <Row className="mission-list">

              <Col xs={2} className="custom-col mask d-flex  align-items-center">
                <h4 className="h4-name">
                  {mission.mission_name}
                </h4>
              </Col>
              <Col xs={8} className="custom-col">
                <p className="p-name">
                  {mission.description}
                </p>
              </Col>

              <Col className=" d-flex align-items-center ">
                <Button
                  variant={isMissionJoined(mission.mission_id) ? 'warning' : 'outline-primary'}
                  size="sm"
                  onClick={() => handleReservation(mission.mission_id)}
                  style={{ marginRight: '10px', padding: '10px' }}
                >
                  {isMissionJoined(mission.mission_id) ? 'Cancel Mission' : 'join Mission'}
                </Button>

                <Badge
                  bg={isMissionJoined(mission.mission_id) ? 'success' : 'secondary'}
                  style={{ fontSize: '13px', padding: '13px' }}
                >
                  {isMissionJoined(mission.mission_id) ? 'joined' : 'not joined'}
                </Badge>

              </Col>

            </Row>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default Missions;
