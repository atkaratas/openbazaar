#!/bin/bash
nohup python3 /tmp/openbazaar/shadow_fixer.py > /tmp/openbazaar/shadow.log 2>&1 &
nohup python3 /tmp/openbazaar/chaos_swarm.py > /tmp/openbazaar/swarm_feedback.log 2>&1 &
echo "Shadow and Chaos Swarm started."
