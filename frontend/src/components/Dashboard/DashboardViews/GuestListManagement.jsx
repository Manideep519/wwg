import { Box, Button, Flex, ScrollArea, Stack, Table, Text, TextInput, Title } from "@mantine/core";
import { useContext, useEffect, useRef, useState } from "react";
import { TemplateContext } from "../../../App";

const GuestListManagement = ({ setView }) => {
  const { templateData, setTemplateData } = useContext(TemplateContext);

  const [newGuest, setNewGuest] = useState({
    guestName: "",
    guestEmail: "",
    guestNumber: "",
  });

  const tableRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGuest((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddGuestToList = () => {
    setTemplateData((prev) => {
      return {
        ...prev,
        guestList: [...prev.guestList, newGuest],
      };
    });
    setNewGuest({
      guestName: "",
      guestEmail: "",
      guestNumber: "",
    });
  };

  return (
    <>
      <Text size="lg" mb={"lg"}>
        Add Guest details
      </Text>

      <Stack>
        <Flex gap={"lg"}>
          <TextInput
            name="guestName"
            label="Guest name"
            value={newGuest.guestName}
            onChange={handleInputChange}
          />
          <TextInput
            name="guestEmail"
            label="Guest email"
            value={newGuest.guestEmail}
            onChange={handleInputChange}
          />
          <TextInput
            name="guestNumber"
            label="Guest number"
            value={newGuest.guestNumber}
            onChange={handleInputChange}
          />
          <Button
            style={{
              alignSelf: "flex-end",
            }}
            variant="outline"
            onClick={handleAddGuestToList}
          >
            Add
          </Button>
        </Flex>
        <Text size="lg">Guest List</Text>

        <ScrollArea h={250}>
          <Table ref={tableRef} withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Guest #</Table.Th>
                <Table.Th>Guest Name</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Phone Number</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {templateData?.guestList?.map((guest, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{index + 1}</Table.Td>
                  <Table.Td>{guest.guestName}</Table.Td>
                  <Table.Td>{guest.guestEmail}</Table.Td>
                  <Table.Td>{guest.guestNumber}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
        <Button
          mt={"lg"}
          style={{
            alignSelf: "flex-end",
          }}
          onClick={() => {
            setView(() => "Photo Gallery");
          }}
          size="md"
        >
          Save
        </Button>
      </Stack>
    </>
  );
};

export default GuestListManagement;
