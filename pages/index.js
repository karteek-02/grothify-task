import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Card from '@/components/card';
import Circle from '@/components/circle';

const SEOReport = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState(null);
  const [showIframe, setShowIframe] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [onPageScore, setOnPageScore] = useState(null);
  const [show, setShow] = useState(false);
  const [externalLinksCount, setExternalLinksCount] = useState(null);
  const [scriptsCount, setScriptsCount] = useState(null);
  const [scriptsSize, setScriptsSize] = useState(null);
  const iframeRef = useRef();

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const loadWebsite = () => {
    if (!isValidUrl(url)) {
      setError('Please enter a valid URL.');
      return;
    }
    setError(null);
    postTask();
  };

  const isValidUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch (error) {
      return false;
    }
  };

  const postTask = async () => {
    try {
      const res = await fetch("https://growthify-server.onrender.com/api/task", {
        method: 'POST',
        body: JSON.stringify({
          url: url
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      console.log(data);
      setTaskId(data.result.tasks[0].id);
      alert("Task created successfully");
      setShow(true);
    } catch (error) {
      console.error('Error fetching SEO report:', error);
      setError('Error fetching SEO report.');
      alert("Task creation failed.");
    }
  };

  const fetchScores = async () => {
    const resourceRes = await fetch("https://growthify-server.onrender.com/api/page_score", {
      method: 'POST',
      body: JSON.stringify({
        id: taskId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const resourceData = await resourceRes.json();

    if (resourceData.result.crawl_progress === "in_progress" || resourceData.result == null) {
      alert("Crawl in progress. Please try again after some time.");
      return
    }
    console.log(resourceData.result)
    const textData = resourceData.result.items[0].meta.content;
    const htagsData = resourceData.result.items[0].meta.external_links_count;
    const scriptsCountData = resourceData.result.items[0].meta.scripts_count;
    const scriptsSizeData = resourceData.result.items[0].meta.scripts_size;
    const onpagescoredata = resourceData.result.items[0].onpage_score;
    console.log(onpagescoredata);
    console.log(resourceData);
    const scores = Object.entries(textData).map(([key, value]) => ({
      label: key,
      score: value
    }));
    setExternalLinksCount(htagsData);
    setScriptsCount(scriptsCountData);
    setScriptsSize(scriptsSizeData);
    setOnPageScore(onpagescoredata);
    setShowIframe(true);
    setPageData(scores);
  }

  return (
    <div className='flex flex-col py-16 px-16 items-center bg-[#181a1b] min-h-screen'>
      <h1 className='text-2xl font-bold text-blue-200'>SEO Report</h1>
      <div className='w-2/3'>
        <input
          type="text"
          className='border-2 p-2 my-4 border-blue-400 rounded font-semibold w-full text-black'
          placeholder="Enter URL (e.g., https://example.com)"
          value={url}
          onChange={handleUrlChange}
        />
      </div>
      <div className='flex flex-cols gap-2'>
        <button
          onClick={loadWebsite}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Get SEO Report
        </button>
        {show && <button
          onClick={() => fetchScores()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Get On-Page Score
        </button>}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}<br></br>

      {onPageScore && (
        <Circle score={onPageScore} description="On-Page Score" />
      )}

      <div className="grid grid-cols-3 gap-2 my-4">
        {externalLinksCount && (
          <Card score={externalLinksCount} description="external_links_count" />
        )}

        {scriptsCount && (
          <Card score={scriptsCount} description="scripts_count" />
        )}

        {scriptsSize && (
          <Card score={scriptsSize} description="scripts_size" />
        )}
      </div>

      {pageData && (
        <div className="grid grid-cols-3 gap-2 my-4">
          {pageData.map((item, idx) => (
            <Card key={idx} score={item.score} description={item.label} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SEOReport;
