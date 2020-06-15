// @desc    Get all Activities

import { Activity } from "../types/activity.ts";
import {v4} from 'https://deno.land/std/uuid/mod.ts';

let activities : Activity[] = [
    {
      activity: "Learn how to write in shorthand",
      accessibility: 0.1,
      type: "education",
      participants: 1,
      price: "",
      link: "",
      id: "6778219",
    },
    {
      activity: "Learn how to french braid hair",
      accessibility: 0.1,
      type: "education",
      participants: 1,
      price: "",
      link: "",
      id: "8926492",
    },
    {
      activity: "Compliment someone",
      accessibility: 0.0,
      type: "social",
      participants: 2,
      price: "",
      link: "",
      id: "9149470",
    },
  ];

// @route   GET /api/v1/activities
const getActivities = ({ response }: { response: any }) => {
    response.body = {
      success: true,
      data: activities,
    };
  };
  
  // @desc    Get single Activity
  // @route   GET /api/v1/activities/:id
  const getActivity = ({
    params,
    response,
  }: {
    params: { id: string };
    response: any;
  }) => {
    const activity: Activity | undefined = activities.find(
      (p) => p.id === params.id
    );
  
    console.log(activity);
  
    if (activity) {
      response.status = 200;
      response.body = {
        success: true,
        data: activity,
      };
    } else {
      response.status = 404;
      response.body = {
        success: false,
        msg: "No Activity found",
      };
    }
  };
  
  // @desc    Add Activity
  // @route   Post /api/v1/activities
  const addActivity = async ({
    request,
    response,
  }: {
    request: any;
    response: any;
  }) => {
    const body = await request.body();
  
    console.log(body);
  
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "No data",
      };
    } else {
      const activity: Activity = body.value;
      activity.id = v4.generate();
      activities.push(activity);
      response.status = 201;
      response.body = {
        success: true,
        data: activity,
      };
    }
  };
  
  // @desc    Update Activity
  // @route   PUT /api/v1/activities/:id
  const updateActivity = async ({
    params,
    request,
    response,
  }: {
    params: { id: string };
    request: any;
    response: any;
  }) => {
    const activity: Activity | undefined = activities.find(
      (p) => p.id === params.id
    );
  
    if (activity) {
      const body = await request.body();
  
      const updateData: Activity = body.value;
  
      activities = activities.map((p) =>
        p.id === params.id ? { ...p, ...updateData } : p
      );
  
      response.status = 200;
      response.body = {
        success: true,
        data: activities,
      };
    } else {
      response.status = 404;
      response.body = {
        success: false,
        msg: "No Activity found",
      };
    }
  };
  
  // @desc    Delete Activity
  // @route   DELETE /api/v1/activities/:id
  const deleteActivity = ({ params, response }: { params: { id: string }, response: any }) => {
      activities = activities.filter(p => p.id !== params.id)
      response.body = {
          success: true,
          msg: 'Activity removed'
      }
  }
  
  export { getActivities, getActivity, addActivity, updateActivity, deleteActivity }
  