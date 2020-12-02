import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";
import "../styles/AdminCreate.css";

function AdminCreate({ show }) {
  const [poolName, setPoolName] = useState("");
  const [poolAddress, setPoolAddress] = useState("");
  const [poolPhone, setPoolPhone] = useState("");

  const [poolPublic, setPoolPublic] = useState(false);
  const [poolPrivate, setPoolPrivate] = useState(false);
  const [poolHotel, setPoolHotel] = useState(false);

  const [poolForChild, setPoolForChild] = useState(false);
  const [poolForWoman, setPoolForWoman] = useState(false);
  const [poolForDisabled, setPoolForDisabled] = useState(false);

  const [poolIndoor, setPoolIndoor] = useState(false);
  const [poolOutdoor, setPoolOutdoor] = useState(false);

  const [poolOpentime, setPoolOpentime] = useState(false);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (poolName === "") {
      alert("수영장 이름을 입력해주세요");
    } else {
      alert(
        `${poolName}, ${poolAddress}, ${poolPhone}, ${poolPublic}, ${poolPrivate}, ${poolHotel}, ${poolForChild}, ${poolForWoman}, ${poolForDisabled}, ${poolIndoor}, ${poolOutdoor}, ${poolOpentime}`
      );
    }
    const information = {
      poolName,
      poolAddress,
      poolPhone,
      poolPublic,
      poolPrivate,
      poolHotel,
      poolForChild,
      poolForWoman,
      poolForDisabled,
      poolIndoor,
      poolOutdoor,
      poolOpentime,
    };
    // post request
    axios
      .post(`http://localhost:3000/admin/pool`, { information })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <Form
      id="adminCreateForm"
      onSubmit={handleCreateSubmit}
      className={show ? "" : "displayNone"}
    >
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          수영장 이름
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="수영장 이름을 입력하세요."
            required
            value={poolName}
            onChange={(e) => setPoolName(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          수영장 주소
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="수영장 주소를 입력하세요."
            required
            value={poolAddress}
            onChange={(e) => setPoolAddress(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          수영장 전화번호
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="수영장 전화번호를 입력하세요."
            value={poolPhone}
            onChange={(e) => setPoolPhone(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          세부사항
        </Form.Label>
        <Col sm={10}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label className="font-weight-bold">운영 방식</Form.Label>
              <div className="mb-3">
                <Form.Check
                  label="공공"
                  type="checkbox"
                  onChange={(e) => {
                    setPoolPublic(e.target.checked);
                  }}
                />
                <Form.Check
                  label="사설"
                  type="checkbox"
                  onChange={(e) => setPoolPrivate(e.target.checked)}
                />
                <Form.Check
                  label="호텔"
                  type="checkbox"
                  onChange={(e) => setPoolHotel(e.target.checked)}
                />
              </div>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="font-weight-bold">전용 수영장</Form.Label>
              <div className="mb-3">
                <Form.Check
                  label="유아"
                  type="checkbox"
                  onChange={(e) => setPoolForChild(e.target.checked)}
                />
                <Form.Check
                  label="여성"
                  type="checkbox"
                  onChange={(e) => setPoolForWoman(e.target.checked)}
                />
                <Form.Check
                  label="장애인"
                  type="checkbox"
                  onChange={(e) => setPoolForDisabled(e.target.checked)}
                />
              </div>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="font-weight-bold">유형</Form.Label>
              <div className="mb-3">
                <Form.Check
                  label="실내"
                  type="checkbox"
                  onChange={(e) => setPoolIndoor(e.target.checked)}
                />
                <Form.Check
                  label="야외"
                  type="checkbox"
                  onChange={(e) => setPoolOutdoor(e.target.checked)}
                />
              </div>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="font-weight-bold">자유 수영</Form.Label>
              <div className="mb-3">
                <Form.Check
                  label="가능"
                  type="checkbox"
                  onChange={(e) => setPoolOpentime(e.target.checked)}
                />
              </div>
            </Form.Group>
          </Form.Row>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button variant="primary" type="submit">
            추가
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default AdminCreate;