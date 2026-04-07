#!/bin/bash
pkill -f "serve dist" 2>/dev/null || true
pkill -f "serve" 2>/dev/null || true
sleep 2

cd /home/ec2-user/transform-custom/e-shopping-test7/e-shopping/ecommerce-frontend/vue3-app
npx serve dist -l 5173 -s > /tmp/serve-vue3.log 2>&1 &
SERVE_PID=$!
echo "Serve PID: $SERVE_PID"

sleep 4
cat /tmp/serve-vue3.log
echo "---"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:5173/)
echo "HTTP Status: $STATUS"

if [ "$STATUS" = "200" ]; then
    echo "Vue 3 server is running!"
else
    echo "Vue 3 server FAILED. Trying port 4173..."
    STATUS2=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4173/)
    echo "HTTP Status on 4173: $STATUS2"
fi
