#!/bin/bash
cd /home/ec2-user/transform-custom/e-shopping-test7/e-shopping/ecommerce-frontend/vue3-app
pkill -f "vite" 2>/dev/null
sleep 1
npx vite --port 5173 > /tmp/vite.log 2>&1 &
VITE_PID=$!
echo "Vite PID: $VITE_PID"
sleep 6
cat /tmp/vite.log
echo "---"
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:5173/
echo ""
echo "Server check done"
