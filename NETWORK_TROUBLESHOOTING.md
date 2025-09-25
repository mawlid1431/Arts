# 🚨 Network Access Troubleshooting Guide

Your Next.js server is running on port 5000, but your friend can't access it. Here's how to fix this:

## 🔥 **Step 1: Configure Windows Firewall (CRITICAL)**

### Option A: Using Windows GUI (Recommended)
1. **Press Windows Key + R**, type `firewall.cpl`, press Enter
2. Click **"Allow an app or feature through Windows Defender Firewall"**
3. Click **"Change Settings"** (requires admin)
4. Click **"Allow another app..."**
5. Click **"Browse"** and navigate to your Node.js installation:
   - Usually: `C:\Program Files\nodejs\node.exe`
   - Or: `C:\Users\[username]\AppData\Roaming\npm\node.exe`
6. Check **both Private and Public** checkboxes
7. Click **OK**

### Option B: Using Command Prompt (Run as Administrator)
```cmd
netsh advfirewall firewall add rule name="Node.js Port 5000" dir=in action=allow protocol=TCP localport=5000
netsh advfirewall firewall add rule name="Node.js All Ports" dir=in action=allow program="C:\Program Files\nodejs\node.exe"
```

### Option C: Temporarily Disable Windows Firewall (Testing Only)
1. Open **Windows Defender Firewall**
2. Click **"Turn Windows Defender Firewall on or off"**
3. **Temporarily** turn off firewall for Private networks
4. **⚠️ REMEMBER TO TURN IT BACK ON AFTER TESTING!**

## 📡 **Step 2: Verify Network Configuration**

### Check if port 5000 is listening:
```bash
netstat -ano | findstr :5000
```
You should see: `0.0.0.0:5000` or `[::]:5000` (not `127.0.0.1:5000`)

### Test local access first:
1. Open your browser
2. Go to: `http://localhost:5000`
3. Verify the website loads

### Check your IP address:
```bash
ipconfig | findstr IPv4
```
Confirm your IP is `192.168.129.206`

## 🌐 **Step 3: Network Testing**

### From your computer, test network access:
```bash
curl http://192.168.129.206:5000
```

### Have your friend try these URLs:
1. `http://192.168.129.206:5000`
2. `http://192.168.129.206:5000/` (with trailing slash)
3. Try different browsers (Chrome, Firefox, Edge)

## 🛠️ **Step 4: Alternative Solutions**

### If firewall rules don't work, try:
1. **Router Settings**: Check if your router blocks inter-device communication
2. **WiFi Network Type**: Ensure you're both on the same network (not guest network)
3. **Antivirus**: Temporarily disable antivirus software
4. **VPN**: Ensure neither of you are using VPN

### Use ngrok for quick testing:
```bash
# Install ngrok: https://ngrok.com/download
npx ngrok http 5000
```
This will give you a public URL like: `https://abc123.ngrok.io`

## 🐛 **Current Issues to Fix**

### 1. Database Issue (High Priority)
Your Supabase database needs to be set up first:
- Go to your Supabase dashboard
- Run the SQL scripts from `DATABASE_SETUP.md`
- This will create the `products` table and sample data

### 2. Server Configuration (Done ✅)
- ✅ Server listening on `0.0.0.0:5000`
- ✅ CORS headers configured
- ✅ Next.js config updated

## 🎯 **Quick Test Steps**

1. **You test locally**: `http://localhost:5000`
2. **Set up firewall** (most critical step)
3. **You test network**: `http://192.168.129.206:5000`
4. **Friend tests**: `http://192.168.129.206:5000`
5. **Set up database** (to see actual content)

## 📞 **If Still Not Working**

Try these diagnostic commands and share the output:

```bash
# Check what's listening on port 5000
netstat -ano | findstr :5000

# Check Windows Firewall status
netsh advfirewall show allprofiles state

# Test network connectivity
ping 192.168.129.206

# Check if the server responds
curl -v http://192.168.129.206:5000
```

**Most common cause**: Windows Firewall is blocking the connection. The firewall step is usually what fixes it!