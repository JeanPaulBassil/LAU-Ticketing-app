import React, { useCallback, useState, useEffect, useContext, Dispatch } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import common from "../../styles/common";
import styles from "../../styles/settings/settings";
import { MaterialIcons } from "@expo/vector-icons";
import useAuth from "../../contexts/auth";
import CustomButton from "../../components/common/Button";
import api from "../../services/api";
import EventsList from "../../components/settings/EventList";
import useEvents from "../../hooks/useEvents";
import ErrorDisplay from "../../components/common/ErrorDisplay";
import { EventDetailContext } from "../../contexts/EventDetails";
import { Action } from "../../types/types";
<<<<<<< HEAD
=======
import useModal from "../../hooks/useModal";
import { EditModal } from "../../components/settings/EditModal";
>>>>>>> b662b713d830ed130e7a9d4fb5d46563511a3800

const Settings = () => {
  const { logout, state } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { dispatch } = useContext(EventDetailContext) as { dispatch: Dispatch<Action> };
<<<<<<< HEAD
=======
  const { visible, openModal, closeModal } = useModal();
  const [currentEventId, setCurrentEventId] = useState<string>("");
>>>>>>> b662b713d830ed130e7a9d4fb5d46563511a3800

  const {
    loading: loading_events,
    error: error_events,
    events,
    fetchEvents,
    setLoading: setLoadingEvents
  } = useEvents();

  useEffect(() => {
    fetchEvents();
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      await api.logout();
      setError("");
      logout();
    } catch (err: any) {
      setError(err.response.data.message);
      dispatch({ type: 'SET_ERROR', payload: err.response.data.message });
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEvent = useCallback(async (event_id: string) => {
    setLoadingEvents(true);
    try {
      await api.deleteEvent(event_id);
      setError("");
    } catch (err: any) {
      setError(err.response.data.message);
      dispatch({ type: 'SET_ERROR', payload: err.response.data.message });
    } finally {
      setLoadingEvents(false);
      fetchEvents();
    }
  },[]);

  const onEditSubmit = useCallback(async (date: string) => {
    setLoadingEvents(true);
    try {
      closeModal();
      await api.editEvent(currentEventId, date);
      setError("");
    } catch (err: any) {
        setError(err.response.data.message);
        dispatch({ type: 'SET_ERROR', payload: err.response.data.message });
    } finally {
      setLoadingEvents(false);
      fetchEvents();
    }
    
  }, []);

  if ((error || error_events) && !loading && !loading_events) {
    return (
      <SafeAreaView style={common.container}>
        <ErrorDisplay
          loading={loading || loading_events}
          error={error_events}
          handleError={fetchEvents}
        />
      </SafeAreaView>
    );
  }

  

  const openEditModal = (event_id: string) => {
    setCurrentEventId(event_id);
    console.log("onEditModal eventID:", currentEventId)
    openModal();
  }

  return (
    <SafeAreaView style={common.container}>
      <EditModal visible={visible} onClose={closeModal} handleCancel={closeModal} handleSubmit={onEditSubmit} loading={loading}/>
      <View style={common.header}>
        <View>
          <Text style={common.header_text}>Settings</Text>
          <View style={common.header_underline} />
        </View>
        <CustomButton
          disabled={loading}
          onPress={signOut}
          title={""}
          style={styles.logout_button}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <View style={styles.logout_content}>
              <Text style={styles.logout_button_text}>Logout</Text>
              <MaterialIcons name="logout" size={14} color="white" />
            </View>
          )}
        </CustomButton>
      </View>

      <View style={styles.account_container}>
        <View>
          <Text style={styles.account_text}>Account Details</Text>
          <View style={styles.account_underline} />
        </View>

        <View style={styles.account_details}>
          <Text style={styles.label}>Club Name</Text>
          <View style={styles.input}>
            <Text style={styles.input_text}>{state?.club?.name}</Text>
          </View>
        </View>
        <View style={styles.account_details}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.input}>
            <Text style={styles.input_text}>{state?.club?.email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.events_container}>
        <View>
          <Text style={styles.account_text}>Your Events</Text>
          <View style={styles.account_underline} />
        </View>
      </View>

      {(loading_events) && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#005C4A"
          />
        </View>
      )}

      <EventsList
        loading={loading_events}
        error={error || error_events}
        onDelete={deleteEvent}
        events={events}
        onEdit={openEditModal}
      />
    </SafeAreaView>
  );
};

export default Settings;
